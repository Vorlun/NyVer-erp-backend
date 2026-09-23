import { ExamsService } from './exams.service.js';
import { CreateExamDto, UpdateExamDto, ExamResultDto } from './dto/create-exam.dto.js';
export declare class ExamsController {
    private examsService;
    constructor(examsService: ExamsService);
    findAll(groupId?: string): Promise<({
        group: {
            id: number;
            name: string;
        };
        _count: {
            results: number;
        };
    } & {
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        groupId: number;
        maxScore: number;
        examDate: Date;
    })[]>;
    findOne(id: number): Promise<{
        group: {
            id: number;
            name: string;
        };
        results: ({
            student: {
                id: number;
                phone: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            studentId: number;
            score: import("@prisma/client/runtime/library").Decimal;
            examId: number;
        })[];
    } & {
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        groupId: number;
        maxScore: number;
        examDate: Date;
    }>;
    create(dto: CreateExamDto): Promise<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        groupId: number;
        maxScore: number;
        examDate: Date;
    }>;
    update(id: number, dto: UpdateExamDto): Promise<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        groupId: number;
        maxScore: number;
        examDate: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    setResults(id: number, results: ExamResultDto[]): Promise<{
        group: {
            id: number;
            name: string;
        };
        results: ({
            student: {
                id: number;
                phone: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            studentId: number;
            score: import("@prisma/client/runtime/library").Decimal;
            examId: number;
        })[];
    } & {
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        groupId: number;
        maxScore: number;
        examDate: Date;
    }>;
}
