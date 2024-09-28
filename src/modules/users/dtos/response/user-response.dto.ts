
export interface UserResponseDTOProps {
    id: string;
    fullName: string;
    document: string;
    accountAddress: string;
    balance: bigint;
}

export default class UserResponseDTO {
    id: string;
    fullName: string;
    document: string;
    accountAddress: string;
    balance: string;

    constructor(props: UserResponseDTOProps) {
        this.id = props.id;
        this.fullName = props.fullName;
        this.document = props.document;
        this.accountAddress = props.accountAddress;
        this.balance = props.balance.toString();
    }
}