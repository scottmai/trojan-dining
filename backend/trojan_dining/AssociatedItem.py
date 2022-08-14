from collections import defaultdict

class AssociatedItem():
    
    def __init__(self, item_name, hall_name, hall_time, phone_number = None):
        self.name = item_name
        self.times_to_halls = defaultdict(lambda: set())
        self.times_to_halls[hall_time].add(hall_name)
        self.phone_number = phone_number
        