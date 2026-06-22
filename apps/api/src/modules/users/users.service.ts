import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { type User, type PaginatedUsers, UserRole, UserStats } from './types';
import { QueryOptionsDto, CreateUserDto, UpdateUserDto } from './dto';
import { SortBy, Order } from './dto/query-options.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  private getDesignationCategory(designation: string): string {
    const title = designation.toLowerCase();

    if (
      title.includes('frontend') ||
      (title.includes('react') && !title.includes('native')) ||
      title.includes('ui developer')
    ) {
      return 'Frontend';
    }
    if (
      title.includes('backend') ||
      title.includes('database') ||
      title.includes('embedded') ||
      title.includes('systems')
    ) {
      return 'Backend';
    }
    if (
      title.includes('full stack') ||
      title.includes('full-stack') ||
      title.includes('software engineer') ||
      title.includes('staff engineer') ||
      title.includes('principal engineer') ||
      title.includes('intern') ||
      title.includes('graduate')
    ) {
      return 'Full Stack & Software Engineering';
    }
    if (
      title.includes('devops') ||
      title.includes('devsecops') ||
      title.includes('sre') ||
      title.includes('reliability') ||
      title.includes('cloud') ||
      title.includes('infrastructure') ||
      title.includes('platform') ||
      title.includes('release')
    ) {
      return 'DevOps & Cloud';
    }
    if (
      title.includes('data') ||
      title.includes('ml') ||
      title.includes('machine learning') ||
      title.includes('scientist')
    ) {
      return 'Data & AI/ML';
    }
    if (
      title.includes('mobile') ||
      title.includes('ios') ||
      title.includes('android') ||
      title.includes('flutter') ||
      title.includes('react native')
    ) {
      return 'Mobile';
    }
    if (
      title.includes('designer') ||
      title.includes('ux') ||
      title.includes('ui/ux') ||
      title.includes('visual') ||
      title.includes('interaction') ||
      title.includes('accessibility')
    ) {
      return 'Design';
    }
    if (
      title.includes('qa') ||
      title.includes('testing') ||
      title.includes('performance engineer')
    ) {
      return 'QA & Testing';
    }
    if (
      title.includes('manager') ||
      title.includes('vp') ||
      title.includes('director') ||
      title.includes('cto') ||
      title.includes('scrum') ||
      title.includes('architect')
    ) {
      return 'Management & Leadership';
    }
    return 'Operations & Business';
  }

  private getParsedCount(count: string | number): number {
    return typeof count === 'string' ? parseInt(count, 10) : count;
  }

  // GET all records
  async getAll(pageData: QueryOptionsDto): Promise<PaginatedUsers> {
    const {
      page = 1,
      limit = 28,
      sortBy = SortBy.CREATED,
      order = Order.ASC,
    } = pageData;

    const sortFieldMap: Record<SortBy, string> = {
      [SortBy.CREATED]: 'createdAt',
      [SortBy.UPDATED]: 'updatedAt',
      [SortBy.FIRST_NAME]: 'firstName',
      [SortBy.LAST_NAME]: 'lastName',
    };
    const orderMap: Record<Order, string> = {
      [Order.ASC]: 'ASC',
      [Order.DESC]: 'DESC',
    };

    const [data, total] = await this.usersRepo.findAll(
      page,
      limit,
      sortFieldMap[sortBy],
      orderMap[order],
    );
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  // GET record by ID
  async getOne(getId: string): Promise<User> {
    const foundUser = await this.usersRepo.findOne({ id: getId });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${getId} not found`);
    }
    return foundUser;
  }

  // POST create new record
  async create(createData: CreateUserDto): Promise<User> {
    const foundUser = await this.usersRepo.findOne({
      email: createData.email,
    });
    // Already exists: throw 409 Conflict Error
    if (foundUser) {
      throw new ConflictException(
        `User with email ${createData.email} already exists`,
      );
    }
    const newDate = Date.now();
    const idSlug: string = `${createData.firstName.toLowerCase().replace(/\s+/g, '-')}-${createData.lastName.toLowerCase().replace(/\s+/g, '-')}-${newDate}`;
    const hashedPassword = await bcrypt.hash(createData.password, 10);
    const newUser: User = {
      ...createData,
      id: idSlug,
      password: hashedPassword,
      role: UserRole.USER,
      createdAt: newDate,
      updatedAt: newDate,
      isBanned: false,
    };
    return await this.usersRepo.createOrReplace(newUser);
  }

  // PUT Replace entire record based on id with a new User.
  async replace(replaceId: string, replaceData: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepo.findOne({ id: replaceId });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${replaceId} not found`);
    } else {
      const newDate: number = Date.now();
      const newUser: User = {
        ...replaceData,
        id: existingUser?.id,
        password: 'PLACEHOLDER_PASS_HASH',
        role: existingUser?.role || UserRole.USER,
        createdAt: existingUser?.createdAt || newDate,
        updatedAt: newDate,
        isBanned: existingUser?.isBanned || false,
      };
      return await this.usersRepo.createOrReplace(newUser);
    }
  }

  // PATCH Update records partially
  async update(
    updateId: string,
    updateData: UpdateUserDto,
  ): Promise<User | null> {
    const existingUser = await this.usersRepo.findOne({ id: updateId });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${updateId} not found`);
    }
    const newDate: number = Date.now();
    const partialUpdatedUser: Partial<User> = {
      // building a partial user payload
      ...updateData,
      updatedAt: newDate,
    };
    return await this.usersRepo.update(updateId, partialUpdatedUser);
  }

  // DELETE record by ID
  async delete(deleteId: string): Promise<User> {
    const deletedUser = await this.usersRepo.deleteOne(deleteId);
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${deleteId} not found`);
    }
    return deletedUser;
  }

  // POST seed initial data to the db
  async seed(): Promise<void> {
    return await this.usersRepo.seed();
  }

  // GET search results based on query
  async search(
    query: string,
    pageData: QueryOptionsDto,
  ): Promise<PaginatedUsers> {
    const { page = 1, limit = 28 } = pageData;
    const [data, total] = await this.usersRepo.search(query, page, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  // GET dashboard statistics - Key Statistics cards, charts data
  async getStats(): Promise<any> {
    const data = await this.usersRepo.getStats();

    // Bar Chart Data - Aggregate skills from skillsFreq + Other category
    const mappedSkills = data.skillsFreq.map(({ skill, count }) => ({
      skill,
      count: this.getParsedCount(count),
    }));
    const top10Skills = mappedSkills.slice(0, 10);
    const otherCount = mappedSkills
      .slice(10)
      .reduce((sum, item) => sum + item.count, 0);
    const aggregatedSkills = [...top10Skills];
    if (otherCount > 0) {
      aggregatedSkills.push({ skill: 'Other', count: otherCount });
    }

    // Designations Donut Chart Data - Aggregate designations
    const categoryMap = data.designationsFreq.reduce(
      (acc, { designation, count }) => {
        const category = this.getDesignationCategory(designation);
        const parsedCount = this.getParsedCount(count);

        acc[category] = (acc[category] || 0) + parsedCount;
        return acc;
      },
      {} as Record<string, number>,
    );
    const aggregatedDesignations = Object.entries(categoryMap).map(
      ([designation, count]) => ({
        designation,
        count,
      }),
    );

    // New Joinees Line Chart Data - Aggregate createdAt to monthly count
    const monthlyMap = data.createdAtFreq.reduce(
      (acc, { createdAt, count }) => {
        const date = new Date(createdAt);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        // Format as "YYYY-MM-DD" representing the first day of the month
        const monthKey = `${year}-${String(month + 1).padStart(2, '0')}-01`;

        const countVal =
          typeof count === 'string' ? parseInt(count, 10) : count;
        acc[monthKey] = (acc[monthKey] || 0) + countVal;
        return acc;
      },
      {} as Record<string, number>,
    );
    const aggregatedCreatedAt = Object.entries(monthlyMap)
      .map(([createdAt, count]) => ({
        createdAt,
        count,
      }))
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

    return {
      ...data,
      skillsFreq: aggregatedSkills,
      designationsFreq: aggregatedDesignations,
      createdAtFreq: aggregatedCreatedAt,
    };
  }
}
