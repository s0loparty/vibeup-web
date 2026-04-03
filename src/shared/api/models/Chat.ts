/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Чат
 */
export type Chat = {
    id: number;
    type: Chat.type;
    title?: string | null;
    created_by: number;
    last_message_id?: number | null;
    created_at?: string;
    updated_at?: string;
};
export namespace Chat {
    export enum type {
        PRIVATE = 'private',
        GROUP = 'group',
    }
}

