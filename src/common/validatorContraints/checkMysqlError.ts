import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { MysqlError } from 'mysql';

export const checkMysqlError = (error: any) => {
  const mysqlError = error as MysqlError;
  if (mysqlError.code === 'ER_DUP_ENTRY') {
    throw new BadRequestException(mysqlError.sqlMessage);
  }
  throw new InternalServerErrorException(mysqlError.message);
}
