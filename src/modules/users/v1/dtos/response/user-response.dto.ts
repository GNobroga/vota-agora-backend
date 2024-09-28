
export default class UserResponseDTO {
    id: string;

    fullName: string;

    document: string;

    walletAddress: string;

    constructor(props: Partial<UserResponseDTO>) {
        this.id = props.id;
        this.fullName = props.fullName;
        this.document = props.document;
        this.walletAddress = props.walletAddress;
    }
}