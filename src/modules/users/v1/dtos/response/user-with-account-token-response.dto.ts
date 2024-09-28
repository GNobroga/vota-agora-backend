
export interface UserWithAccountTokenResponseDTOProps {
    id: string;
    fullName: string;
    document: string;
    tokenAddress: string;
    accessKey: string;
}

export default class UserWithAccountTokenResponseDTO {
    id: string;

    fullName: string;

    document: string;

    tokenAddress: string;

    accessKey: string;

    constructor(props: UserWithAccountTokenResponseDTOProps) {
        this.id = props.id;
        this.fullName = props.fullName;
        this.document = props.document;
        this.tokenAddress = props.tokenAddress;
        this.accessKey = props.accessKey;
    }
}