def construct_notification(association_map):

    dining_map = {"USC Village Dining Hall": "Village", "Parkside Restaurant & Grill": "Parkside", "Everybody's Kitchen": "EVK"}
    def helper(meal_time, am):

        res = ""

        for item in am[meal_time]:
            line = ""
            line += item.name 
            line += " // "

            hall_list = list(item.times_to_halls[meal_time])

            hall_list.sort()

            for hall in hall_list:
                line += dining_map[hall]
                line += " "

            line += "\n"
            res += line
            
        res += "\n"

        return res

    result = ""
    result += "BREAKFAST\n"

    result += helper("Breakfast", association_map)

    result += "BRUNCH\n"

    result += helper("Brunch", association_map)

    result += "LUNCH\n"

    result += helper("Lunch", association_map)

    result += "DINNER\n"

    result += helper("Dinner", association_map)

    return result
    