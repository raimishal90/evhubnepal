export declare abstract class AbstractMetaService {
    protected abstract db: any;
    protected abstract metaKeys: string[];
    create(id: number, meta: Record<string, string>): Promise<any>;
    transform(metaArray: {
        meta_key: string;
        meta_value: string | null;
    }[]): Record<string, string | null>;
    update(id: number, meta: Record<string, string>): Promise<void>;
}
