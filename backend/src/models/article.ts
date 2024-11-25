import mongoose from 'mongoose';
const { Schema } = mongoose;

const articleSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
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
  photo: {
    type: String,
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

// este índice nos ayuda a identificar el id del usuario que borre la noticia si la misma ya tiene muchos usuarios appendados a ella
articleSchema.index({
  'archiveDate.userId': 1,
});

export const Article = mongoose.model('Article', articleSchema);
