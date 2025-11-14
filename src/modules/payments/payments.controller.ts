/// <reference types="multer" />

import { 
  Controller, 
  Get, 
  Post, 
  Param, 
  UseInterceptors, 
  UploadedFile, 
  BadRequestException, 
  Req, 
  UsePipes, 
  ValidationPipe,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('screenshot', {
      storage: diskStorage({
        destination: './uploads/payments',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/i)) {
          return cb(new Error('Only image files (jpg, jpeg, png, gif) and PDFs are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    })
  )
  async uploadPayment(
    @UploadedFile() file: Express.Multer.File,
    @Query('registerId', ParseIntPipe) registerId: number,
    @Query('utr') utr: string
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!registerId) {
      // Clean up the uploaded file if validation fails
      if (file.path) fs.unlinkSync(file.path);
      throw new BadRequestException('registerId is required');
    }

    if (!utr) {
      // Clean up the uploaded file if validation fails
      if (file.path) fs.unlinkSync(file.path);
      throw new BadRequestException('utr is required');
    }

    try {
      const screenshotUrl = `/uploads/payments/${file.filename}`;
      const payment = await this.paymentsService.uploadPayment(
        registerId,
        utr,
        screenshotUrl
      );

      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      // Clean up the uploaded file if there's an error
      if (file.path) fs.unlinkSync(file.path);
      throw new BadRequestException(error.message || 'Failed to process payment');
    }
  }

  @Get('by-register/:registerId')
  async getPaymentByRegister(@Param('registerId', ParseIntPipe) registerId: number) {
    try {
      const payment = await this.paymentsService.getPaymentByRegister(registerId);
      if (!payment) {
        return {
          success: true,
          data: null,
          message: 'No payment found for this register'
        };
      }
      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to fetch payment');
    }
  }
}