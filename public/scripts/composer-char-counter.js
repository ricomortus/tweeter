$(document).ready(function() {
  $('#tweet-text').on('input', function() {
      const maxChars = 140;
      const typedChars = $(this).val().length;
      const remainingChars = maxChars - typedChars;

      // Use 'this' to refer to the textarea and traverse the DOM
      const $counter = $(this).closest('.new-tweet-box').find('.counter');
      $counter.text(remainingChars);

      // Change color if limit exceeded
      $counter.css('color', remainingChars < 0 ? 'red' : '#545149');
  });
});