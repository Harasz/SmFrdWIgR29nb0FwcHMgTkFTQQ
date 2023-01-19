import { IsDateString } from 'class-validator';
import { GreaterThanDate, DateNotInFuture } from '../validators';

/**
 * This interface is used to define the query parameters for the get pictures endpoint.
 */
export class GetPicturesParams {
  /**
   * The date from which to get pictures.
   * @example 2020-01-04
   */
  @IsDateString()
  @DateNotInFuture()
  from: string;

  /**
   * The date to which to get pictures.
   * @example 2020-02-05
   */
  @IsDateString()
  @GreaterThanDate('from')
  @DateNotInFuture()
  to: string;
}
