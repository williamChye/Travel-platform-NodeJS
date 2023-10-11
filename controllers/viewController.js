const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const Booking = require('./../models/bookingModel');

const Review = require('./../models/reviewModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  if (!tour) {
    console.log('dont have this tour ah ');
    return next(
      new AppError(
        'There is no tour with that name!\n(Im from viewcontroller (by using AppError by errorController))',
        404
      )
    );
  }
  res.status(200).render('tour', {
    title: ' The Forest Hiker Tour',
    tour
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  //1)find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  //1)find tours with return  bookings
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: ' The Forest Hiker Tour'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Me'
  });
};
