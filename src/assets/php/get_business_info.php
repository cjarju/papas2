<?php
require_once '_database.php';

$sql = "select * from about";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $id = $row['id'];
    $business_name = $row['business_name'];
    /* $about_text = nl2br($row['about_text'],true); */
    $about_text = nl2p($row['about_text']);
    $intro_lead_in = $row['intro_lead_in'];
    $intro_heading = $row['intro_heading'];
    $phone_no = $row['phone_no'];
    $email = $row['email'];
    $instagram = $row['instagram'];
    $facebook = $row['facebook'];
}

/* free result set */
$result->free_result();


 