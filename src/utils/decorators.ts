export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const updatedDescriptor: PropertyDescriptor = {
    get() {
      return originalMethod.bind(this);
    },
  };
  return updatedDescriptor;
}