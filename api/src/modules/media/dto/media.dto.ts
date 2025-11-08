import { IsString, IsOptional } from 'class-validator';

export class MediaDto {
  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsString()
  altText?: string;
}

export class PartialMediaDto extends MediaDto {}
