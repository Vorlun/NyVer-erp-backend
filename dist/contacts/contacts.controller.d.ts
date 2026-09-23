import { ContactsService } from './contacts.service.js';
import { CreateContactDto, UpdateContactStatusDto, QueryContactDto } from './dto/contact.dto.js';
export declare class ContactsController {
    private contactsService;
    constructor(contactsService: ContactsService);
    create(dto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
        id: number;
    }>;
    findAll(query: QueryContactDto): Promise<{
        data: {
            message: string | null;
            id: number;
            email: string | null;
            phone: string;
            status: import("@prisma/client").$Enums.ContactStatus;
            created_at: Date;
            updated_at: Date;
            name: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        stats: {
            new: number;
            inProgress: number;
            resolved: number;
            rejected: number;
        };
    }>;
    updateStatus(id: number, dto: UpdateContactStatusDto): Promise<{
        message: string | null;
        id: number;
        email: string | null;
        phone: string;
        status: import("@prisma/client").$Enums.ContactStatus;
        created_at: Date;
        updated_at: Date;
        name: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
