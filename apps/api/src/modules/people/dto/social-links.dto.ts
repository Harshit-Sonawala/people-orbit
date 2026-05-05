import { IsNotEmpty, IsOptional, IsUrl, ValidateIf } from 'class-validator';

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

  // atleast one is present
  @ValidateIf(o => !o.linkedIn && !o.website && !o.github)
  @IsNotEmpty({ message: 'Atleast one social link must be provided if socialLinks is defined' })
  _atLeastOne?: string;
}