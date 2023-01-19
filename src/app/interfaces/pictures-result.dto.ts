export class PicturesResultDto {
  urls: string[];

  /**
   * Create a new instance of PicturesResultDto.
   * @param {string[]} pictures - the pictures URL.
   * @returns {PicturesResultDto} result DTO.
   */
  static fromPictures(pictures: string[]): PicturesResultDto {
    const dto = new PicturesResultDto();
    dto.urls = pictures;
    return dto;
  }
}
