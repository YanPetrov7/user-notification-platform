import { Test, TestingModule } from '@nestjs/testing';
import { NotificationSchedulerSvcController } from './notification-scheduler-svc.controller';
import { NotificationSchedulerSvcService } from './notification-scheduler-svc.service';

describe('NotificationSchedulerSvcController', () => {
  let notificationSchedulerSvcController: NotificationSchedulerSvcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationSchedulerSvcController],
      providers: [NotificationSchedulerSvcService],
    }).compile();

    notificationSchedulerSvcController = app.get<NotificationSchedulerSvcController>(NotificationSchedulerSvcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notificationSchedulerSvcController.getHello()).toBe('Hello World!');
    });
  });
});
