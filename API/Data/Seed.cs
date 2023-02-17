using API.Common;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
            if (userManager.Users.Any()) return;

            AddRoles(roleManager);

            var superAdmin = new AppUser { UserName = "superadmin" };
            userManager.CreateAsync(superAdmin, "Pa$$w0rd");

            var admin = new AppUser { UserName = "admin" };
            userManager.CreateAsync(admin, "Pa$$w0rd");

            var regularUser = new AppUser { UserName = "regularuser" };
            userManager.CreateAsync(regularUser, "Pa$$w0rd");

            AssignRolesToUsers(userManager, superAdmin, admin, regularUser);
        }

        private static void AssignRolesToUsers(UserManager<AppUser> userManager,
            AppUser superAdmin, AppUser admin, AppUser regularUser)
        {
            userManager
               .AddToRolesAsync(superAdmin, new[] { RoleTypes.RegularUser, RoleTypes.Admin, RoleTypes.SuperAdmin });
            userManager
               .AddToRolesAsync(admin, new[] { RoleTypes.RegularUser, RoleTypes.Admin });
            userManager
               .AddToRolesAsync(regularUser, new[] { RoleTypes.RegularUser });
        }

        private static void AddRoles(RoleManager<AppRole> roleManager)
        {
            var roles = new List<AppRole>
            {
                new AppRole{Name = RoleTypes.RegularUser},
                new AppRole{Name = RoleTypes.Admin},
                new AppRole{Name = RoleTypes.SuperAdmin},
            };

            foreach (var role in roles)
            {
                roleManager.CreateAsync(role);
            }
        }
    }
}

