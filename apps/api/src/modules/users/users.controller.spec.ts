import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    getAll: jest.fn(),
    getOne: jest.fn(),
    create: jest.fn(),
    replace: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    seed: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.seed when seed endpoint is hit', async () => {
    const result = await controller.seedUsers();
    expect(mockUsersService.seed).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Database seeding process completed' });
  });
});
