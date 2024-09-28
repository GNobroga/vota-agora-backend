export interface WalletCreatedDTOProps {
    accountAddress: string;
    privateKey: string;
    tokenAddress: string;
}

export default class WalletCreatedDTO {
    
    accountAddress: string;
    privateKey: string;
    tokenAddress: string;

    constructor(props: WalletCreatedDTOProps) {
        this.accountAddress = props.accountAddress;
        this.privateKey = props.privateKey;
        this.tokenAddress = props.tokenAddress;
    }
}