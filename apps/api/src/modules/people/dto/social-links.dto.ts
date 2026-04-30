import { IsOptional, IsUrl } from 'class-validator';

export class SocialLinksDto {
  @IsOptional()
  @IsUrl()
  linkedIn?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsUrl()
  github?: string;
}