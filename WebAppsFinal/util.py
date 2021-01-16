import json, re

hex_pattern = re.compile('''[0-9A-Fa-f]{6}|[0-9A-Fa-f]{5}|[0-9A-Fa-f]{4}|
	[0-9A-Fa-f]{3}|[0-9A-Fa-f]{2}|[0-9A-Fa-f]{1}''')

#hex_pound_pattern = '''(^#){1}''' + hex_pattern

# Returns a dict of every value in each row held in the query_result parameter
def parse_schools(query_result):
	school_list = []
	for row in query_result:
		school_list.append({'schoolName': row.schoolName, 'color1': row.color1,
		 'color2': row.color2, 'logo': row.logo})
	return json.dumps(school_list)

# Returns True if hex_code is a valid hex color code
def check_hex(hex_code):
	if (hex_pattern.search(hex_code) is not None):
		return True
	return False	

def clean_hex(hex_code):
	hex_match = hex_pattern.search(hex_code)
	return ('#' + hex_match.group(0))
