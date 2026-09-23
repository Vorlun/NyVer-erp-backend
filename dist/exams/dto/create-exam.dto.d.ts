export declare class CreateExamDto {
    title: string;
    examDate: string;
    maxScore?: number;
    groupId: number;
}
declare const UpdateExamDto_base: import("@nestjs/common").Type<Partial<CreateExamDto>>;
export declare class UpdateExamDto extends UpdateExamDto_base {
}
export declare class ExamResultDto {
    studentId: number;
    score: number;
}
export {};
