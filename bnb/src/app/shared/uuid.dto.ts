/**
 * Created by daniel on 08.08.16.
 */
export class UUIDDto {
  private uuid: string;

  constructor(key: string) {
    this.uuid = key;
  }

  get Key(): string {
    return this.uuid;
  }
}
