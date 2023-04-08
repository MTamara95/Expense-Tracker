using API.Common;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            await AddRoles(roleManager);

            var superAdmin = new AppUser { UserName = "superadmin" };
            await userManager.CreateAsync(superAdmin, "Pa$$w0rd");

            var admin = new AppUser { UserName = "admin" };
            await userManager.CreateAsync(admin, "Pa$$w0rd");

            var regularUser = new AppUser { UserName = "regularuser" };
            await userManager.CreateAsync(regularUser, "Pa$$w0rd");

            await AssignRolesToUsers(userManager, superAdmin, admin, regularUser);
        }

        private static async Task AssignRolesToUsers(UserManager<AppUser> userManager,
            AppUser superAdmin, AppUser admin, AppUser regularUser)
        {
            await userManager
               .AddToRolesAsync(superAdmin, new[] { RoleTypes.RegularUser, RoleTypes.Admin, RoleTypes.SuperAdmin });
            await userManager.AddToRolesAsync(admin, new[] { RoleTypes.RegularUser, RoleTypes.Admin });
            await userManager.AddToRolesAsync(regularUser, new[] { RoleTypes.RegularUser });
        }

        private static async Task AddRoles(RoleManager<AppRole> roleManager)
        {
            var roles = new List<AppRole>
            {
                new AppRole{Name = RoleTypes.RegularUser},
                new AppRole{Name = RoleTypes.Admin},
                new AppRole{Name = RoleTypes.SuperAdmin},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }
    }
}

