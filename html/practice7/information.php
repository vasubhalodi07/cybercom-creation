<?php 
  $fname = $_POST['fname'];
  $lname = $_POST['lname'];
  $month = $_POST['month'];
  $day = $_POST['day'];
  $year = $_POST['year'];
  $gender = $_POST['gender'];
  $email = $_POST['email'];
  $re_email = $_POST['re-email'];
  $pwd = $_POST['pwd'];
  $re_pass = $_POST['re-pass'];
  $question = $_POST['question'];
  $answer = $_POST['answer'];
  $address = $_POST['address'];
  $city = $_POST['city'];
  $state = $_POST['state'];
  $zip = $_POST['zip'];
  $phone = $_POST['phone'];
  $mobile = $_POST['mobile'];
?>

<!DOCTYPE html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Practice 7 - Table</title>
    <link rel="stylesheet" href="./css/information.css" />
  </head>
<body>
  <main>
    <h3>Personal Information</h3>
    <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
          </tr>
        </thead>  
        <tbody>
          <tr>
            <td><?php echo $fname ?></td>
            <td><?php echo $lname ?></td>
            <td><?php echo $month ?> / <?php echo $day ?> / <?php echo $year ?></td>
            <td><?php echo $gender ?></td>
          </tr>
        </tbody>
    </table>

    <h3>Account Information</h3>
    <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Re-type Email</th>
            <th>Password</th>
            <th>Re-type Password</th>
            <th>Security Question</th>
            <th>Security Answer</th>
          </tr>
        </thead>  
        <tbody>
          <tr>
            <td><?php echo $email ?></td>
            <td><?php echo $re_email ?></td>
            <td><?php echo $pwd ?></td>
            <td><?php echo $re_pass ?></td>
            <td><?php echo $question ?></td>
            <td><?php echo $answer ?></td>
          </tr>
        </tbody>
    </table>

    <h3>Contact Information</h3>
    <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Phone</th>
            <th>Phone Status </th>
          </tr>
        </thead>  
        <tbody>
          <tr>
            <td><?php echo $address ?></td>
            <td><?php echo $city ?></td>
            <td><?php echo $state ?></td>
            <td><?php echo $zip ?></td>
            <td><?php echo $phone ?></td>
            <td><?php echo $mobile ?></td>
          </tr>
        </tbody>
    </table>
</main>
</body>
</html>