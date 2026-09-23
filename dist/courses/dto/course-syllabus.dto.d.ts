export declare class CreateCourseSyllabusDto {
    lessonOrder: number;
    topic: string;
    description?: string;
}
declare const UpdateCourseSyllabusDto_base: import("@nestjs/common").Type<Partial<CreateCourseSyllabusDto>>;
export declare class UpdateCourseSyllabusDto extends UpdateCourseSyllabusDto_base {
}
export {};
