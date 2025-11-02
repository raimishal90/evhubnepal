import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractMetaService {
  protected abstract db: any;

  protected abstract metaKeys: string[];

  async create(id: number, meta: Record<string, string>) {
    const entries = Object.entries(meta).filter(([key]) =>
      this.metaKeys.includes(key),
    );

    if (!entries.length) return;

    const result = await this.db.createMany({
      data: entries.map(([key, value]) => ({
        id: id,
        meta_key: key,
        meta_value: String(value),
      })),
      skipDuplicates: true,
    });

    return result;
  }

  transform(
    metaArray: { meta_key: string; meta_value: string | null }[],
  ): Record<string, string | null> {
    return metaArray.reduce(
      (acc, item) => {
        acc[item.meta_key] = item.meta_value;
        return acc;
      },
      {} as Record<string, string | null>,
    );
  }

  async update(id: number, meta: Record<string, string>) {
    const missing: { key: string; value: string }[] = [];

    const entries = Object.entries(meta).filter(([key]) =>
      this.metaKeys.includes(key),
    );

    for (const [key, value] of entries) {
      const result = await this.db.updateMany({
        where: { id, meta_key: key },
        data: { meta_value: String(value) },
      });

      if (result.count === 0) {
        missing.push({ key, value });
      }
    }

    if (missing.length) {
      await this.db.createMany({
        data: missing.map(({ key, value }) => ({
          id,
          meta_key: key,
          meta_value: String(value),
        })),
        skipDuplicates: true,
      });
    }

    /*
    @uzes this way we can do all the operation in one go [ In above code three loops to perform this task]

      if (!Object.keys(entries).length) {
        throw new BadRequestException('No valid meta keys provided.');
      }


      for (const key in meta) {
        const value = meta[key];

        if( !this.metaKeys.includes(key)) {
          continue; // Skip keys that are not in metaKeys
        }
        // Update the existing entry
        const  result = await this.db.updateMany({
            where: { id, meta_key: key },
            data: { meta_value: String(value) },
        });

        // If no rows were updated, create a new entry
        if (result.count === 0) {
          await this.db.create({
            data: {
              id,
              meta_key: key,
              meta_value: String(value),
            },
          });
        }
      }
    */
  }
}
