import mongoose from 'mongoose';
const { Schema } = mongoose;

export const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  archiveDate: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      archivedStatus: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

// indexamos el array archiveDate por la propiedad userId para luego tener mejor perfomance en el filtrado de noticias por este id de usuario
articleSchema.index({
  'archiveDate.userId': 1,
});
