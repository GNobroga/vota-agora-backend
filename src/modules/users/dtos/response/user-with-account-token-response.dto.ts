
export interface UserWithAccountTokenResponseDTOProps {
    id: string;
    fullName: string;
    document: string;
    tokenAddress: string;
    privateKey: string;
}

export default class UserWithAccountTokenResponseDTO {
    id: string;

    fullName: string;

    document: string;

    tokenAddress: string;

    privateKey: string;

    constructor(props: UserWithAccountTokenResponseDTOProps) {
        this.id = props.id;
        this.fullName = props.fullName;
        this.document = props.document;
        this.tokenAddress = props.tokenAddress;
        this.privateKey = props.privateKey;
    }
}