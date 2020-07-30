import express from 'express';
import checker from '../middlemare/checker.js';
import { userModel } from '../database/database.js';

const router = express.Router();

// router
//   .route('/', checker)

//   .get((req, res) => {
//     res.render('party');
//   })

//   .post(async (req, res) => {
//     const { user } = req.session;
//     const { name, location, date } = req.body;
//     try {
//       const party = await new partyModel({name, location, date, user: user.login});
//       await party.save();
//       res.render('oneparty', {party} )
//     } catch{
//       res.render('error')
//     }
//   })

//   .delete(async(req, res) =>{
//     await partyModel.findOneAndDelete({_id: req.body.id});
//     res.json('удалено')
//   })


//   router.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     const party = await partyModel.findOne({_id:id})

//     if(party.user === res.locals.user.login){
//       const adm = true
//       res.render('oneparty', {party, adm} )
//     } else{
//       res.render('oneparty', {party} )
//     }
//   })

//   router.get('/edit/:id', async (req, res) => {
//     const id = req.params.id;
//     const party = await partyModel.findOne({_id:id});
//     res.render('partyedit', {party} );
//   })

//   router.post('/edit/:id', async (req, res) => {
//     const id = req.params.id;
//     const {name, location, date} = req.body;
//     await partyModel.findOneAndUpdate({_id:id },{$set:{name, location, date}})
//     res.render('succes');
//   })


export default router;
