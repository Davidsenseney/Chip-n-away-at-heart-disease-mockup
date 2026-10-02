import re

def update_modals(content):
    # Driver modal updates
    content = re.sub(
        r'<form class="chip-modal-form" onsubmit="event.preventDefault\(\); this\.innerHTML = .*?">',
        r'<form class="chip-modal-form" id="driver-form">',
        content, count=1
    )
    content = content.replace('<input type="text" placeholder="John Doe" required>', '<input type="text" name="name" placeholder="John Doe" required>', 1)
    content = content.replace('<input type="text" placeholder="123 Main St" required>', '<input type="text" name="address" placeholder="123 Main St" required>', 1)
    content = content.replace('<input type="text" placeholder="Warner Robins" required>', '<input type="text" name="city" placeholder="Warner Robins" required>', 1)
    content = content.replace('<input type="text" placeholder="GA" required>', '<input type="text" name="state" placeholder="GA" required>', 1)
    content = content.replace('<input type="text" placeholder="31093" required>', '<input type="text" name="zip" placeholder="31093" required>', 1)
    content = content.replace('<input type="tel" placeholder="(555) 123-4567" required>', '<input type="tel" name="phone" placeholder="(555) 123-4567" required>', 1)
    content = content.replace('<input type="email" placeholder="john@example.com" required>', '<input type="email" name="email" placeholder="john@example.com" required>', 1)
    content = content.replace('<input type="text" placeholder="Corvette Club">', '<input type="text" name="club" placeholder="Corvette Club">', 1)
    content = content.replace('<input type="text" placeholder="1969" required>', '<input type="text" name="vehicle_year" placeholder="1969" required>', 1)
    content = content.replace('<input type="text" placeholder="Chevrolet" required>', '<input type="text" name="vehicle_make" placeholder="Chevrolet" required>', 1)
    content = content.replace('<input type="text" placeholder="Camaro" required>', '<input type="text" name="vehicle_model" placeholder="Camaro" required>', 1)
    content = content.replace('<input type="text" placeholder="Red" required>', '<input type="text" name="vehicle_color" placeholder="Red" required>', 1)
    
    content = content.replace(
        '<input type="checkbox" required class="mt-1 w-5 h-5 text-apple-red rounded border-gray-300 focus:ring-apple-red flex-shrink-0 cursor-pointer">',
        '<input type="checkbox" name="agreed_liability" value="Yes" required class="mt-1 w-5 h-5 text-apple-red rounded border-gray-300 focus:ring-apple-red flex-shrink-0 cursor-pointer">', 1
    )
    
    # second occurrence of John Doe (Digital signature)
    content = content.replace('<input type="text" placeholder="John Doe" required>', '<input type="text" name="digital_signature" placeholder="John Doe" required>', 1)
    
    content = content.replace(
        '<!-- Footer / Submit -->',
        '<p id="driver-form-status" class="text-sm font-medium min-h-[1.25rem] mt-2" aria-live="polite"></p>\n                    <!-- Footer / Submit -->', 1)

    # Vendor modal updates
    content = re.sub(
        r'<form class="chip-modal-form" onsubmit="event.preventDefault\(\); this\.innerHTML = .*?">',
        r'<form class="chip-modal-form" id="vendor-form">',
        content, count=1
    )
    content = content.replace('<input type="text" placeholder="Jane Smith" required>', '<input type="text" name="contact_name" placeholder="Jane Smith" required>')
    content = content.replace('<input type="text" placeholder="Acme Health" required>', '<input type="text" name="company" placeholder="Acme Health" required>')
    content = content.replace('<input type="text" placeholder="Medical Supplies, Wellness Coaching, etc." required>', '<input type="text" name="business_type" placeholder="Medical Supplies, Wellness Coaching, etc." required>')
    content = content.replace('<input type="text" placeholder="123 Business Rd, City, State, Zip" required>', '<input type="text" name="address" placeholder="123 Business Rd, City, State, Zip" required>')
    content = content.replace('<input type="tel" placeholder="(555) 987-6543" required>', '<input type="tel" name="phone" placeholder="(555) 987-6543" required>')
    content = content.replace('<input type="email" placeholder="jane@acme.com" required>', '<input type="email" name="email" placeholder="jane@acme.com" required>')
    
    content = content.replace(
        '<input type="checkbox" required class="mt-1 w-5 h-5 text-apple-red rounded border-gray-300 focus:ring-apple-red flex-shrink-0 cursor-pointer">',
        '<input type="checkbox" name="agreed_vendor" value="Yes" required class="mt-1 w-5 h-5 text-apple-red rounded border-gray-300 focus:ring-apple-red flex-shrink-0 cursor-pointer">'
    )
    
    content = content.replace(
        '<!-- Footer / Submit -->',
        '<p id="vendor-form-status" class="text-sm font-medium min-h-[1.25rem] mt-2" aria-live="polite"></p>\n                    <!-- Footer / Submit -->', 1)
        
    return content

for file in ["index.html", "volunteer.html"]:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Margin updates
    content = content.replace('gap-4 mt-8 mx-auto', 'gap-4 mt-12 mx-auto')
    
    content = update_modals(content)
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)
