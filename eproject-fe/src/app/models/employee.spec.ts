import { Employee } from './employee';

describe('EmployeeTs', () => {
  it('should create an instance', () => {
    expect(new Employee()).toBeTruthy();
  });
});
