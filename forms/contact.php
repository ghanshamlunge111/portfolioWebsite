<!-- <?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'contact@example.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  echo $contact->send();
?> -->

 <?php
  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'ghanshyamlunge1610@gmail.com';

  // Check if the form is submitted
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $name = $_POST['name'];
      $email = $_POST['email'];
      $subject = $_POST['subject'];
      $message = $_POST['message'];
      
      $to = $receiving_email_address;
      $headers = "From: $email\r\n";
      $headers .= "Reply-To: $email\r\n";
      $headers .= "Content-type: text/html\r\n";
      
      $email_subject = "New Contact Form Submission: $subject";
      $email_body = "<h2>Contact Form Submission</h2>
                     <p><strong>Name:</strong> $name</p>
                     <p><strong>Email:</strong> $email</p>
                     <p><strong>Subject:</strong> $subject</p>
                     <p><strong>Message:</strong><br>$message</p>";
      
      // Send the email
      if (mail($to, $email_subject, $email_body, $headers)) {
          echo "<div class='sent-message'>Your message has been sent. Thank you!</div>";
      } else {
          echo "<div class='error-message'>There was an error sending your message. Please try again later.</div>";
      }
  } else {
      echo "<div class='error-message'>Form submission failed. Please try again.</div>";
  }
?>
