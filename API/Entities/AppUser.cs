﻿using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<Expense> Expenses { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
