import { Prisma } from "@/generated/prisma/client";

export type Municipality = Prisma.MunicipalityGetPayload<{
  include: {
    core_elements: {
      include: {
        mechanisms: true;
        factors: true;
      };
    };
  };
}>;

export type CoreElement = Municipality['core_elements'][number];
export type Mechanism = CoreElement['mechanisms'][number];
export type Factor = CoreElement['factors'][number];