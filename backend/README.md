



## Roles
The following roles are implemented:
- Airline
- Airline Manager
- Customer

## Workflow (Functionalities)
This is for just one airline that wants to sell seats to their customers via the internet.
Following are the steps of workflow:
1. All roles are authenticated and authorized using JWT.
2. Airline Admin will set the prices of the seats. There should be three types of seats:
   - First Class
   - Business Class
   - Economy
3. The Airline Admin can create and update flights.
4. The Airline Admin can create and update the features of each type of seat.
5. The Airline Admin can set the total number of seats for each flight.
6. The Airline Manager can see a list of seats which the Admin has added or edited when he/she logs in.
7. The Airline Manager then needs to approve the new price or updates.
8. The Airline Admin and Manager can see the payment history, flight history and sales.
9. When the price and update are approved by the manager only then should it be available for the customer to buy.
10. The Customer should be able to view, search, filter and buy seats based on availability.
11. When a customer buys a ticket the system can calculate how many seats are left. If all seats are bought the application does not let the customers buy more seats.
12. The Customer should be able to select the following when buying a seat:
    - Origin and detination cities
    - Dates of travel
    - Number of people travelling
13. When the customer selects the seat and confirms the booking, the flight Itinerary is shown to the customer
14. When the customer approves the itinerary the customer is taken to a payment page where the total price should be calculated and shown.
15. When the customer presses the pay button, process the transaction and mark the seat sold.
16. Once the seat is sold, an email is sent to the customer with the flight itinerary.
17. Display a detailed list of all booked flights for the customer.
18. More flights are recommended to the user based on their recent bookings.

## Development Setup



2. Install the dependencies:
  ```
  $ pip install -r requirements.txt
  ```

3. Run the development server:
  ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
  ```

4. Navigate to Home page [http://127.0.0.1:8000/](http://127.0.0.1:8000/)



