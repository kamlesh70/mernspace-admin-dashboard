export type LoginFieldType = {
    email: string;
    password: string;
};

export type ReactChildren = {
    children: React.ReactNode | undefined;
}


export enum Roles {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
    MANAGER = 'manager',
}