RestEasy

Overview

RestEasy is a web-based platform designed to streamline restaurant table reservations. It allows users to book tables in advance, view menus, manage reservations, and receive real-time notifications.

Features

Table Reservation System

Users can select a date and time to book tables.

Real-time notifications for reservation updates.

Menu Browsing

Users can view restaurant menus and make pre-orders.

User Account Management

Registration and login functionality.

Profile management, including viewing reservation history.

Validation Implementation

Validation checks ensure data accuracy and prevent errors:

Phone Number: Verifies correct format and a minimum of 10 digits.

Email: Checks for a valid email structure.

Password: Ensures minimum length and complexity.

Responsive Design

Supports both desktop and mobile devices.

Technologies Used

HTML: Structuring the application's web pages.

CSS: Styling the user interface with responsive design.

JavaScript: Adding interactivity and implementing validation logic.

File Structure

project-directory
├── HomePage.html          # Main landing page
├── SignIn.html            # Login page
├── OwnerSign.html         # Restaurant owner login page
├── NewOrder.html          # Reservation creation page
├── Profile.html           # User profile page
├── homepage.css           # Styling for the main page
├── SignIn.css             # Styling for the login page
├── OwnerSign.css          # Styling for the owner login page
├── NewOrder.css           # Styling for the reservation page
├── Profile.css            # Styling for the user profile
├── scripts.js             # JavaScript file for interactivity and validation

Validation Details

Phone Number

Ensures input contains exactly 10 digits.

Blocks invalid characters.

Email

Verifies format (e.g., example@domain.com).

Password

Checks for minimum length of 8 characters.

Encourages inclusion of numbers and special characters.

How to Use

To start, open the HomePage.html file in any modern web browser.

Navigate through the platform:

Register or log in via the SignIn.html page.

Book a table using NewOrder.html.

View or manage your profile in Profile.html.

Future Enhancements

Advanced User Management

Adding profile pictures and password recovery options.

Restaurant Reviews

Users can leave reviews and rate their dining experiences.

Payment Integration

Allow users to pay for their reservations online.
