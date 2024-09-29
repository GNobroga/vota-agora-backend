
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
    rewardToken: string;

    constructor(props: UserResponseDTOProps) {
        this.id = props.id;
        this.fullName = props.fullName;
        this.document = props.document;
        this.accountAddress = props.accountAddress;
        this.rewardToken = props.balance.toString();
    }
}