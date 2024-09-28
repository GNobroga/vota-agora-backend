
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type CatDocument = HydratedDocument<Cat>;

// @Schema({ id: true })
// export class Cat {

//     id: string;

//     @Prop()
//     name: string;

//     @Prop()
//     age: number;

//     @Prop()
//     breed: string;
// }

// export const CatSchema = SchemaFactory.createForClass(Cat);

// CatSchema.set('toJSON', {
//     transform(doc, record: Cat) {
//         record.id = doc._id as string;
//         delete record['_id'];
//         delete record['__v'];
//         return {
//             ...record
//         }
//     }
// });