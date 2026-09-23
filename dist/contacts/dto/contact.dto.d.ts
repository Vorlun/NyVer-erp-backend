import { ContactStatus } from '@prisma/client';
export declare class CreateContactDto {
    name: string;
    phone: string;
    email?: string;
    message?: string;
}
export declare class UpdateContactStatusDto {
    status: ContactStatus;
}
export declare class QueryContactDto {
    status?: ContactStatus;
    page?: number;
    limit?: number;
    search?: string;
}
