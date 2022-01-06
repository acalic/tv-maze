const Rating = ({ rating }) => (
  <span
    className={
      rating < 4 ? "text-danger" : rating < 6 ? "text-warning" : "text-success"
    }
  >
    {rating}
  </span>
);

export default Rating;
