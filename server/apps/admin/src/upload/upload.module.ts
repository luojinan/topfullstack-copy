import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
const crypto = require('crypto');
const UFile = require('@charbo/ufile-node-sdk');

var options = {
  PublicKey:'R0BoAAaMLoKOGmPSK1oMIsusN8n4LBPOfu3ruj0r', //api公钥
  PrivateKey: 'Tu0TOKCnwjK6OVR1yXS2NW6E9bDBziTdR0-IA2HM6TRBgfoG5DmshnFO1UlViE4-', //api私钥
  bucket:'Default',  //存储空间名
  domain:'topfullstack-copy.cn-gd.ufileos.com',  //存储空间域名
  // protocol:'' //网络协议头
}
const getFilename = (req, file, cb) => {
	crypto.pseudoRandomBytes(16, (err, raw) => {
		cb(err, err ? undefined :
			(raw.toString('hex') + file.originalname.substr(file.originalname.lastIndexOf('.')))
		);
	});
};

class UFileClass {
  client: any;
  getFilename:any
  // getFilename: (req: any, file: any, cb: any) => void;
	constructor() {
		this.client = new UFile(options);
		this.getFilename = getFilename;
	}

	_handleFile(req, file, cb) {
		if (!this.client) {
			console.error('对象存储创建失败');
			return cb({message: '对象存储创建失败'});
		}
		this.getFilename(req, file, (err, filename) => {
      if (err) return cb(err);
      console.log('文件名',file.stream);
      // {key:'filename', filePath:'C:\1.jpg'}
      let qwe:any = { 
        key:'filename', 
        filePath:'C:/1.jpg',
        prefix:'12', 
        fileRename:filename, 
        unique: false 
      }
			this.client.putFile(qwe).then(
				result => {
					return cb(null, {
						filename: result.name,
						url     : result.url
					});
				}
			).catch(err => {
				return cb(err);
			});
		});
	}

	_removeFile(req, file, cb) {
		if (!this.client) {
			console.error('oss client undefined');
			return cb({message: 'oss client undefined'});
		}
		this.client.delete(file.filename).then(
			result => {
				return cb(null, result);
			}
		).catch(err => {
			return cb(err);
		});
	}
}

@Module({
  imports:[
    MulterModule.register({
      storage: new UFileClass()
    }),
  ],
  controllers: [
    UploadController
  ]
})
export class UploadModule {}


