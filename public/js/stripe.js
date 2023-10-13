const stripe = Stripe(
  'pk_test_51JoKweFq5DOpb6XjWQbcdSv1jIGEGPBgndb96MpGNUECDbrdwYAJhRIdXhXcWc5pqrgu36yVOSfbVzOi7ETFADDN00qg3Eb1c0'
);

const bookTour = async tourId => {
  try {
    //1) get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);
    //1) create a checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {}
  console.log(err);
  showAlert('error', err);
};

const bookBtn = document.getElementById('book-tour');

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
