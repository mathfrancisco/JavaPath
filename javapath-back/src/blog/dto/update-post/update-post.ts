// dto/update-post.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import {CreatePostDto} from "../create-post/create-post";

export class UpdatePostDto extends PartialType(CreatePostDto) {}


