import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const laneSchema = new Schema({
    name: { type: 'String', required: true },
    notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
    id: { type: 'String', required: true, unique: true},
},
{ usePushEach: true });

// laneSchema.pre('find', function (next) {
//     this.populate('notes');
//     next();
//   });

  function populateNotes(next) {
    this.populate('notes');
    next();
  }

  function deleteNotes(next) {
    const notes = this.notes;
    notes.forEach(element => {
      Note.findByIdAndRemove(element._id).exec()
    });
    next();
}

laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);
laneSchema.pre('remove', deleteNotes);

export default mongoose.model('Lane', laneSchema);
