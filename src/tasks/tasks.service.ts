import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TasksService {
	@Cron('0 */14 * * * *')
	handleCron() {
		console.log('Called every 14 minutes');
	}
}
