export declare class CreateLessonMaterialDto {
    title: string;
    fileUrl: string;
    fileType?: string;
    sizeMb?: number;
}
declare const UpdateLessonMaterialDto_base: import("@nestjs/common").Type<Partial<CreateLessonMaterialDto>>;
export declare class UpdateLessonMaterialDto extends UpdateLessonMaterialDto_base {
}
export {};
